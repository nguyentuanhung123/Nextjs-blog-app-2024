This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Kết nỗi database

- B1: npm i mongoose joi

- B2: Tạo 1 thư mục trong thư mục src có tên là database

```jsx
import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionUrl = 'mongodb+srv://nguyentuanhung4529871036:nguyentuanhung123@blog.yir2bsw.mongodb.net/?retryWrites=true&w=majority&appName=blog'

    mongoose
        .connect(connectionUrl)
        .then(() => console.log('blog database connected is successfully'))
        .catct((error) => console.log(error))
}

export default connectToDB;
```

- B3: Tạo models

```jsx
import mongoose from "mongoose";

// databse
// model
// api routes -> add, fetcj / get, update, delete

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
```

- B4: Tạo 1 thư mục là api bên trong thư mục app, bên trong có các thư mục như add-blog, ... và bên trong mỗi thư mcuj có file là route.js

## Joi

```jsx
import Joi from "joi";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})
```

- import Joi from "joi" : Đoạn mã này import thư viện Joi để sử dụng trong việc xác thực dữ liệu.
- Joi.object({...}): Hàm này tạo ra một schema đối tượng mới. Schema này mô tả cấu trúc và các quy tắc xác thực cho đối tượng.
- title: Joi.string().required(): Định nghĩa rằng trường title phải là một chuỗi và là bắt buộc (phải có giá trị).
- description: Joi.string().required(): Định nghĩa rằng trường description phải là một chuỗi và là bắt buộc (phải có giá trị).

### Shadcn/ui : https://ui.shadcn.com/docs/installation/next

- B1: npx shadcn-ui@latest init
- B2: npx shadcn-ui@latest add button
- B3: npx shadcn-ui@latest add dialog
- B4: npx shadcn-ui@latest add input
- B5: npx shadcn-ui@latest add label

### Đóng mở Dialog ở blog-overview

- B1: Copy đoạn code có sẵn
- B2: Xóa một đoạn code có sẵn bên dưới

```jsx
<DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
</DialogTrigger>
```

- B3: Tạo state để quản lý việc đóng mở dialog

```jsx
const [openBlogDialog, setOpenBlogDialog] = useState(false)

<div>
    <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
</div>

<Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
    ...
</Dialog>
```

### Fix bug : Khi dialog được mở, dữ liệu đã viết vẫn được lưu

- Ban đầu:

```jsx
<Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>...</Dialog>
```

- Sửa lại:

```jsx
<Dialog open={openBlogDialog} onOpenChange={() => {
    setOpenBlogDialog(false)
    setBlogFormData({
        title: '',
        description: ''
    })
}
}></Dialog>
```

### Lưu ý

- Khi kết nối api thì có sự khác biệt nhỏ

- Ở folder blogs: có đường dẫn là : http://localhost:3000/blogs, thì ta phải

```jsx
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
```

- Nhưng ở BlogOverview

```jsx
async function handleSaveBlogData() {
    try {
        setLoading(true);
        const apiResponse = await fetch('/api/add-blog', {
            method: 'POST',
            body: JSON.stringify(blogFormData)
        });
        const result = await apiResponse.json();
        if(result?.success) {
            setBlogFormData(initialBlogFormData)
            setOpenBlogDialog(false);
            setLoading(false);
        }
        console.log(result);
    } catch(error) {
        console.log(error);
        setLoading(false);
        setBlogFormData(initialBlogFormData);
    }
}
```

### Fix Bug: Mỗi khi thêm blog mới thì nó không hiện blog mới lên màn hình. Lý do: Màn hình không được refresh. Cách sửa : Sử dụng useRouter()

```jsx
import { useRouter } from 'next/navigation';

const router = useRouter();

useEffect(() => {
    router.refresh();
})

async function handleSaveBlogData() {
    try {
        setLoading(true);
        const apiResponse = await fetch('/api/add-blog', {
            method: 'POST',
            body: JSON.stringify(blogFormData)
        });
        const result = await apiResponse.json();
        if(result?.success) {
            setBlogFormData(initialBlogFormData)
            setOpenBlogDialog(false);
            setLoading(false);
            router.refresh();
        }
        console.log(result);
    } catch(error) {
        console.log(error);
        setLoading(false);
        setBlogFormData(initialBlogFormData);
    }
}
```

### Giải thích về url trong delete blog

```jsx
const { searchParams } = new URL(req.url);
```

- Dòng mã này được sử dụng để trích xuất các tham số truy vấn từ URL trong yêu cầu HTTP. Trong trường hợp này, req.url là URL của yêu cầu.
- new URL(req.url): Tạo một đối tượng URL từ URL của yêu cầu.
- searchParams: Trích xuất đối tượng URLSearchParams từ URL, đối tượng này chứa tất cả các tham số truy vấn từ URL.

- Ví Dụ Cụ Thể
- Giả sử bạn có một URL như sau: https://example.com/api/items?category=books&sort=asc

- Khi yêu cầu HTTP này được gửi đến server, bạn có thể trích xuất các tham số truy vấn bằng cách sử dụng URL và searchParams như sau:

```jsx
const { searchParams } = new URL('https://example.com/api/items?category=books&sort=asc');

console.log(searchParams.get('category')); // Output: books
console.log(searchParams.get('sort')); // Output: asc
```

### Delete blog

```jsx
async function handleDeleteBlogByID(getCurrentID) {
    try {
        const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
            method: "DELETE"
        })
        const result = await apiResponse.json();

        if(result?.success) {
            router.refresh();
        }
    } catch(e) {
        console.log(e);
    }
}

<Button onClick={() => handleDeleteBlogByID(blogItem._id)}>Delete</Button>
```

```jsx
const updateBlogByBlogID = await Blog.findOneAndUpdate(
    {
        _id: getCurrentBlogId
    }, 
    { title, description },
    { new: true }
);
```

- { new: true }: Tùy chọn này chỉ định rằng phương thức findOneAndUpdate sẽ trả về tài liệu đã được cập nhật thay vì tài liệu gốc trước khi cập nhật.

### Edit Blog: Mở Dialog

```jsx
// edit blog
const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id)
    setBlogFormData({
        title: getCurrentBlog?.title,
        description: getCurrentBlog?.description
    })
    setOpenBlogDialog(true);
}
```

### Fix bug: Khi ta bấm Edit thì nó vẫn để h1: Add New Blog: 

- Ban đầu :

```jsx
<AddNewBlog 
    openBlogDialog={openBlogDialog} 
    setOpenBlogDialog={setOpenBlogDialog}
    loading={loading}
    setLoading={setLoading}
    blogFormData={blogFormData}
    setBlogFormData={setBlogFormData}
    handleSaveBlogData={handleSaveBlogData}
/>
```

- Sau khi thêm:

```jsx
<AddNewBlog 
    openBlogDialog={openBlogDialog} 
    setOpenBlogDialog={setOpenBlogDialog}
    loading={loading}
    setLoading={setLoading}
    blogFormData={blogFormData}
    setBlogFormData={setBlogFormData}
    handleSaveBlogData={handleSaveBlogData}
    currentEditedBlogID={currentEditedBlogID}
    setCurrentEditedBlogID={setCurrentEditedBlogID}
/>
```

```jsx
<DialogTitle>{currentEditedBlogID ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
```

- Do sau khi đóng Dialog currentEditedBlogID vẫn còn giá trị nên ta phải: 

```jsx
<Dialog open={openBlogDialog} onOpenChange={() => {
    setOpenBlogDialog(false)
    setBlogFormData({
        title: '',
        description: ''
    })
    setCurrentEditedBlogID(null)
}
}>
...
</Dialog>
```

## Chỉnh sửa lại hàm handleSaveBlogData sau khi bấm button save changes (Do có thêm chức năng sửa nên ta sẽ dựa vào state currentEditedBlogID)

- Ban đầu

```jsx
async function handleSaveBlogData() {
    try {
        setLoading(true);
        const apiResponse = await fetch('/api/add-blog', {
            method: 'POST',
            body: JSON.stringify(blogFormData)
        });
        const result = await apiResponse.json();
        if(result?.success) {
            setBlogFormData(initialBlogFormData)
            setOpenBlogDialog(false);
            setLoading(false);
            router.refresh();
        }
        console.log(result);
    } catch(error) {
        console.log(error);
        setLoading(false);
        setBlogFormData(initialBlogFormData);
    }
}
```

- Sau khi sửa

```jsx
async function handleSaveBlogData() {
    try {
        setLoading(true);
        const apiResponse = 
            currentEditedBlogID !== null 
                ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
                    method: "PUT",
                    body: JSON.stringify(blogFormData)
                })
                : await fetch('/api/add-blog', {
                    method: 'POST',
                    body: JSON.stringify(blogFormData)
                });
        const result = await apiResponse.json();
        if(result?.success) {
            setBlogFormData(initialBlogFormData)
            setOpenBlogDialog(false);
            setLoading(false);
            setCurrentEditedBlogID(null); // thêm cái này nữa
            router.refresh();
        }
            console.log(result);
    } catch(error) {
        console.log(error);
        setLoading(false);
        setBlogFormData(initialBlogFormData);
    }
}
```






