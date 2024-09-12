// This function can be marked `async` if using `await` inside
export function middleware() {

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}