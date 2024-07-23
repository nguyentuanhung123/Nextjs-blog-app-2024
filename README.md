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

```





