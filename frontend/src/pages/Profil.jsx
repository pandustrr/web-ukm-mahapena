import React from "react";
import {
    Users,
    Target,
    Eye,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Youtube,
    Facebook,
    Link as LinkIcon,
    Award,
    Clock,
    BookOpen,
    Heart,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const Profile = () => {
    const [expandedSections, setExpandedSections] = React.useState({
        profile: true,
        vision: true,
        divisions: true,
        programs: true,
        management: true,
        contact: true,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Data dummy untuk contoh
    const ukmData = {
        name: "UKM Techno Club",
        description:
            "Unit Kegiatan Mahasiswa yang bergerak di bidang teknologi dan pemrograman. Kami fokus pada pengembangan skill teknologi melalui berbagai kegiatan dan proyek kolaboratif.",
        establishedYear: 2015,
        totalMembers: 150,
        vision:
            "Menjadi wadah pengembangan talenta teknologi yang inovatif dan berkontribusi bagi kemajuan teknologi di kampus dan masyarakat.",
        mission: [
            "Menyelenggarakan workshop dan pelatihan teknologi secara berkala",
            "Membangun komunitas yang kolaboratif dalam pengembangan proyek teknologi",
            "Berpartisipasi dalam kompetisi teknologi nasional dan internasional",
            "Membangun jaringan dengan industri teknologi dan komunitas eksternal",
        ],
        divisions: [
            {
                name: "Divisi Pemrograman",
                description:
                    "Fokus pada pengembangan skill pemrograman dan partisipasi dalam kompetisi coding",
                activities: ["Pelatihan teknikal", "Proyek kelompok", "Studi kasus"],
            },
            {
                name: "Divisi Desain",
                description:
                    "Berfokus pada pengembangan UI/UX dan desain grafis untuk kebutuhan proyek",
                activities: ["Pelatihan teknikal", "Proyek kelompok", "Studi kasus"],
            },
            {
                name: "Divisi Riset",
                description: "Melakukan penelitian dan pengembangan teknologi terbaru",
                activities: ["Pelatihan teknikal", "Proyek kelompok", "Studi kasus"],
            },
            {
                name: "Divisi Hubungan Masyarakat",
                description:
                    "Menjalin relasi dengan pihak eksternal dan mengelola komunikasi internal",
                activities: ["Pelatihan teknikal", "Proyek kelompok", "Studi kasus"],
            },
        ],
        workPrograms: [
            {
                name: "Techno Workshop",
                description: "Workshop bulanan tentang teknologi terkini",
                schedule: "Setiap bulan",
            },
            {
                name: "Coding Competition",
                description: "Kompetisi pemrograman internal kampus",
                schedule: "Setiap semester",
            },
            {
                name: "Project Collaboration",
                description: "Proyek kolaborasi dengan mitra eksternal",
                schedule: "Berjalan terus menerus",
            },
            {
                name: "Tech Talk",
                description: "Sharing session dengan praktisi industri",
                schedule: "Setiap 2 bulan",
            },
        ],
        management: [
            {
                name: "Ahmad Rizki",
                position: "Ketua UKM",
                division: "Pimpinan",
            },
            {
                name: "Siti Rahayu",
                position: "Wakil Ketua",
                division: "Pimpinan",
            },
            {
                name: "Budi Santoso",
                position: "Koordinator",
                division: "Divisi Pemrograman",
            },
            {
                name: "Dewi Anggraini",
                position: "Koordinator",
                division: "Divisi Desain",
            },
            {
                name: "Rizky Pratama",
                position: "Koordinator",
                division: "Divisi Riset",
            },
            {
                name: "Maya Sari",
                position: "Koordinator",
                division: "Divisi Hubungan Masyarakat",
            },
        ],
        achievements: [
            "Juara 1 Hackathon Nasional 2022",
            "Finalis Gemastik 2021",
            "Best Design Award Technofest 2020",
        ],
        contact: {
            email: "technoclub@kampus.ac.id",
            phone: "+62 812-3456-7890",
            address: "Gedung Student Center Lt. 2, Kampus Universitas Example",
            socialMedia: {
                instagram: "@ukmtechnoclub",
                youtube: "UKM Techno Club Official",
                facebook: "UKM Techno Club",
            },
            website: "www.ukmtechnoclub.ac.id",
            operatingHours: "Senin - Jumat: 09.00 - 17.00 WIB",
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#113F67] to-[#113F67] text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{ukmData.name}</h1>
                    <p className="text-xl max-w-2xl mx-auto">{ukmData.description}</p>
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Calendar className="text-white" size={20} />
                            <span>Berdiri sejak {ukmData.establishedYear}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Users className="text-white" size={20} />
                            <span>{ukmData.totalMembers}+ Anggota</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Award className="text-white" size={20} />
                            <span>{ukmData.achievements.length}+ Prestasi</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 -mt-10">
                {/* Profile Section */}
                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("profile")}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="text-blue-600" />
                            Profil Singkat
                        </h2>
                        {expandedSections.profile ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {expandedSections.profile && (
                        <div className="mt-6">
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {ukmData.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-5 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                                        Prestasi
                                    </h3>
                                    <ul className="space-y-2">
                                        {ukmData.achievements.map((achievement, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-700 flex items-start gap-2"
                                            >
                                                <Award
                                                    className="text-blue-600 mt-1 flex-shrink-0"
                                                    size={18}
                                                />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 p-5 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                                        Fokus Kegiatan
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="text-gray-700 flex items-start gap-2">
                                            <Heart
                                                className="text-blue-600 mt-1 flex-shrink-0"
                                                size={18}
                                            />
                                            <span>Pengembangan Teknologi</span>
                                        </li>
                                        <li className="text-gray-700 flex items-start gap-2">
                                            <Heart
                                                className="text-blue-600 mt-1 flex-shrink-0"
                                                size={18}
                                            />
                                            <span>Kompetisi Pemrograman</span>
                                        </li>
                                        <li className="text-gray-700 flex items-start gap-2">
                                            <Heart
                                                className="text-blue-600 mt-1 flex-shrink-0"
                                                size={18}
                                            />
                                            <span>Proyek Kolaborasi</span>
                                        </li>
                                        <li className="text-gray-700 flex items-start gap-2">
                                            <Heart
                                                className="text-blue-600 mt-1 flex-shrink-0"
                                                size={18}
                                            />
                                            <span>Pengabdian Masyarakat</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Vision & Mission Section */}
                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("vision")}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Target className="text-blue-600" />
                            Visi & Misi
                        </h2>
                        {expandedSections.vision ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {expandedSections.vision && (
                        <div className="mt-6">
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                                    Visi
                                </h3>
                                <p className="text-gray-700 pl-2 border-l-4 border-blue-500 py-1">
                                    {ukmData.vision}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                                    Misi
                                </h3>
                                <ul className="space-y-3">
                                    {ukmData.mission.map((item, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 flex gap-3 items-start"
                                        >
                                            <div className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-1">
                                                {index + 1}
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </section>

                {/* Divisions Section */}
                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("divisions")}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Users className="text-blue-600" />
                            Divisi UKM
                        </h2>
                        {expandedSections.divisions ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {expandedSections.divisions && (
                        <div className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {ukmData.divisions.map((division, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                            {division.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{division.description}</p>

                                        <div className="pt-3 border-t border-gray-100">
                                            <h4 className="font-medium text-gray-700 mb-2">
                                                Kegiatan Utama:
                                            </h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                {division.activities.map((activity, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                        {activity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Management Section */}
                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("management")}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Eye className="text-blue-600" />
                            Struktur Pengurus
                        </h2>
                        {expandedSections.management ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {expandedSections.management && (
                        <div className="mt-6">
                            {/* <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Periode Kepengurusan
                </h3>
                <p className="text-gray-700">2023/2024</p>
              </div> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {ukmData.management.map((person, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                                            <Users size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="font-semibold text-lg">{person.name}</h3>
                                        <p className="text-blue-600">{person.position}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {person.division}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Contact Section */}
                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("contact")}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Mail className="text-blue-600" />
                            Kontak Kami
                        </h2>
                        {expandedSections.contact ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {expandedSections.contact && (
                        <div className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                        Informasi Kontak
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Mail className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-gray-600">{ukmData.contact.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Phone className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Telepon</p>
                                                <p className="text-gray-600">{ukmData.contact.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Alamat</p>
                                                <p className="text-gray-600">
                                                    {ukmData.contact.address}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Jam Operasional</p>
                                                <p className="text-gray-600">
                                                    {ukmData.contact.operatingHours}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                        Media Sosial
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Instagram className="text-pink-600 flex-shrink-0" />
                                            <p className="text-gray-600">
                                                {ukmData.contact.socialMedia.instagram}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Youtube className="text-red-600 flex-shrink-0" />
                                            <p className="text-gray-600">
                                                {ukmData.contact.socialMedia.youtube}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Facebook className="text-blue-600 flex-shrink-0" />
                                            <p className="text-gray-600">
                                                {ukmData.contact.socialMedia.facebook}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <LinkIcon className="text-gray-600 flex-shrink-0" />
                                            <p className="text-gray-600">{ukmData.contact.website}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">
                                            Ingin bergabung atau berkolaborasi?
                                        </h4>
                                        <p className="text-gray-700 text-sm">
                                            Jangan ragu untuk menghubungi kami melalui salah satu
                                            channel di atas. Kami selalu terbuka untuk kolaborasi dan
                                            anggota baru.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Profile;