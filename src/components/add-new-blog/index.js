"use client";
import React, { Fragment } from 'react'
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Component này được sử dụng trong BlogOverview (trong thư mục cùng cấp blog-overview)
 */

const AddNewBlog = ({openBlogDialog, setOpenBlogDialog, loading, blogFormData, setBlogFormData, handleSaveBlogData}) => {

    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>
            <Dialog open={openBlogDialog} onOpenChange={() => {
                setOpenBlogDialog(false)
                setBlogFormData({
                    title: '',
                    description: ''
                })
            }
            }>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Blog</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input
                                name="title"
                                placeholder="Enter blog title"
                                value={blogFormData.title}
                                id="title"
                                className="col-span-3"
                                onChange={(event) => 
                                    setBlogFormData({
                                        ...blogFormData, 
                                        title: event.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                name="description"
                                value={blogFormData.description}
                                id="description"
                                className="col-span-3"
                                onChange={(event) => 
                                    setBlogFormData({
                                        ...blogFormData, 
                                        description: event.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type="button">
                            {
                                loading ? 'Saving Changes' : 'Save Changes'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AddNewBlog