import { RecipeCard } from './RecipeCard'

function BlogPostList({ posts }) {

	return (
		<div className='blog-post-list'>
			<RecipeCard posts={posts} />
		</div>

	);
}

export default BlogPostList;
