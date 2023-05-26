import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const config = {
    matcher:[
/*        
        /\/api\/auth\/login/,
        /\/api\/auth\/register/,
        /\/api\/auth\/logout/,
        /\/api\/auth\/verify/,
        /\/api\/auth\/forgot/,
        /\/api\/auth\/reset/,
        /\/api\/auth\/reset-confirm/,
        /\/api\/auth\/reset-password/,
        /\/api\/auth\/reset-password-confirm/,
        /\/api\/auth\/change-password/,
        /\/api\/auth\/change-password-confirm/,
*/
        "/conversations/:path*",
        "/users/:path*",
        
    ]

}