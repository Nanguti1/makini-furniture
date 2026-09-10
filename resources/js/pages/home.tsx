export default function HomePage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Welcome to Makini Queens Furniture</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Premium furniture for modern living
            </p>
            <div className="flex gap-4 justify-center">
                <a
                    href="/catalog"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Shop Now
                </a>
                <a
                    href="/lookbooks"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    View Lookbooks
                </a>
            </div>
        </div>
    );
}
