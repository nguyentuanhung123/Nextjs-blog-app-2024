import BlogOverview from "@/components/blog-overview"

const fetchListOfBlogs = async () => {
    try {
        const apiResponse = await fetch('http://localhost:3000/api/get-blogs', {
            method: 'GET',
            cache: 'no-store'
        })
        const result = await apiResponse.json()
        return result?.data
    }
    catch (error) {
        throw new Error(error)
    }
}

const Blogs = async () => {

    const blogList = await fetchListOfBlogs()

    console.log("blogList: ", blogList);

    return (
        <BlogOverview blogList={blogList}/>
    )
}

export default Blogs