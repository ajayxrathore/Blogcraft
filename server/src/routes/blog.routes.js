import {Router} from 'express'
import { upload } from '../middleware/multer.middleware.js'
import {Protected} from '../middleware/auth.middleware.js'
import { blogById, createBlog, deleteBlog, getAllBlogs, getMyBlogs } from '../controller/blog.controller.js'
const router = Router()
router.route('/').post(
    Protected,
    upload.single('image'),
    createBlog
)
router.route('/').get(getAllBlogs)
router.route('/my-blogs').get(Protected,getMyBlogs)
router.route('/:blogId').get(blogById)
router.route('/:blogId').delete(Protected,deleteBlog)

export default router;
