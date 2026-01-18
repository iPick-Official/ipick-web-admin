import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 text-center">
            {/* Animated 404 text */}
            <h1 className="text-9xl font-extrabold animate-bounce">404</h1>

            {/* Message */}
            <p className="mt-4 text-2xl animate-fade-in">
                Oops! Page not found.
            </p>
            <p className="mt-2 animate-fade-in delay-150">
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>

            {/* Go Home Button */}
            <Link
                href="/auth"
                className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 hover:scale-105"
            >
                Go Back
            </Link>
        </div>
    );
}
