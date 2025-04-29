"use client";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className=" py-8 mt-12">
            {/* Bottom copyright */}
            <div className="text-center pt-4 text-xs text-muted-foreground">
                <p>© {year} StockXGoat. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
