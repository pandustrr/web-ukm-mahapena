<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Blog::with('category');

        // Search functionality
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Ordering
        $orderBy = $request->get('order_by', 'created_at');
        $orderDirection = $request->get('order_direction', 'desc');
        $query->orderBy($orderBy, $orderDirection);

        // Pagination
        $perPage = $request->get('per_page', 10);
        $blogs = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $blogs,
            'id' => Auth::id()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'sometimes|required|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'status' => 'sometimes|required|in:draft,published,archived',
            'featured_image' => 'nullable|image|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        try {
            // Handle file upload
            if ($request->hasFile('featured_image')) {
                $path = $request->file('featured_image')->store('blog-images', 'public');
                $validated['featured_image'] = $path;
            }

            $validated['slug'] = Str::slug($validated['title']);
            $iddd = Auth::user();

            // Ensure slug is unique
            $count = Blog::where('slug', $validated['slug'])->count();
            if ($count > 0) {
                $validated['slug'] = $validated['slug'] . '-' . time();
            }

            $blog = Blog::create($validated);

            // Handle tags
            if ($request->has('tags')) {
                $tags = is_array($request->tags) ? $request->tags : [$request->tags];
                $blog->tags()->sync($tags);
            }

            return response()->json([
                'success' => true,
                'message' => 'Blog created successfully',
                'data' => $blog->load('category', 'tags'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blog::with('category', 'tags')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'sometimes|required|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'status' => 'sometimes|required|in:draft,published,archived',
            'featured_image' => 'nullable|image|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        try {
            // Handle file upload
            if ($request->hasFile('featured_image')) {
                // Delete old image if exists
                if ($blog->featured_image) {
                    Storage::disk('public')->delete($blog->featured_image);
                }

                $path = $request->file('featured_image')->store('blog-images', 'public');
                $validated['featured_image'] = $path;
            }

            // Update slug if title changed
            if ($request->has('title') && $request->title !== $blog->title) {
                $validated['slug'] = Str::slug($validated['title']);

                // Ensure slug is unique
                $count = Blog::where('slug', $validated['slug'])
                    ->where('id', '!=', $blog->id)
                    ->count();
                if ($count > 0) {
                    $validated['slug'] = $validated['slug'] . '-' . time();
                }
            }

            $blog->update($validated);

            // Handle tags
            // if ($request->has('tags')) {
            //     $blog->tags()->sync($request->tags);
            // }

            if ($request->has('tags')) {
                $tags = is_array($request->tags) ? $request->tags : [$request->tags];
                $blog->tags()->sync($tags);
            }


            return response()->json([
                'success' => true,
                'message' => 'Blog updated successfully',
                'data' => $blog->load('category', 'tags')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::findOrFail($id);

        try {
            // Delete featured image if exists
            if ($blog->featured_image) {
                Storage::disk('public')->delete($blog->featured_image);
            }

            $blog->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function publish($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update(['status' => 'published']);

        return response()->json([
            'success' => true,
            'message' => 'Blog published successfully'
        ]);
    }

    public function unpublish($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update(['status' => 'draft']);

        return response()->json([
            'success' => true,
            'message' => 'Blog unpublished successfully'
        ]);
    }

    // public function myBlogs(Request $request)
    // {
    //     $query = Blog::with('category')
    //         ->where(
    //             'author_id', // auth()->id()
    //         );

    //     // Add filters and pagination similar to index method
    //     $perPage = $request->get('per_page', 10);
    //     $blogs = $query->paginate($perPage);

    //     return response()->json([
    //         'success' => true,
    //         'data' => $blogs
    //     ]);
    // }

    // Public methods for frontend display
    public function indexPublic(Request $request)
    {
        $query = Blog::with('category')
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');

        // Add filters, search, pagination
        $perPage = $request->get('per_page', 9);
        $blogs = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    public function showPublic($slug)
    {
        $blog = Blog::with('category', 'tags')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment view count
        $blog->increment('views');

        return response()->json([
            'success' => true,
            'data' => $blog
        ]);
    }
}
