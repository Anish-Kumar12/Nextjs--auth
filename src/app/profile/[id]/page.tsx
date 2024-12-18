export default async function UserProfilePage({params} : any) {
    const id = await params.id;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-lg">User ID: {id}</p>
        </div> 
    );
 }