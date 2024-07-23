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

const AddNewBlog = ({openBlogDialog, setOpenBlogDialog}) => {

    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>
            <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
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
                                id="title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AddNewBlog