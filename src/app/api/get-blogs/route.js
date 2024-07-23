import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        const extractAllBlogsFormDatabase = await Blog.find({});

        if(extractAllBlogsFormDatabase) {
            return NextResponse.json({
                success: true,
                data: extractAllBlogsFormDatabase
            })
        } else {
            return NextResponse.json({
                success: false,
                message: 'Something went wrong | Please try again later'
            })
        }      
    }
    catch(error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong | Please try again later'
        })
    }
}