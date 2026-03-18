import React from 'react';
import HeroSection from "../Components/LoginPage/Hero/HeroSection";
import LoginForm from "../Components/LoginPage/LoginForm";

/**
 * LoginPage Page Component
 * Purpose: Main authentication page for logging into the application.
 */
const LoginPage = () => {
    // --- RENDER ---
    return (
        <div className="min-h-screen lg:h-256 flex flex-col lg:flex-row">
            {/* HERO SECTION: Marketing and Context */}
            <HeroSection />

            {/* FORM SECTION: User Login Interface */}
            <div className="lg:w-1/2 w-[90vw] md:w-full flex items-start md:items-center lg:items-start justify-center">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
