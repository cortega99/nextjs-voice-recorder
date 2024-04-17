export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
    const data = { status: 'this is an example of a route handler' };
    return Response.json({ data })
}
