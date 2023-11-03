//layout
import Layout from "../../components/layout";

//import Link
import Link from "next/link";

//import axios
import axios from "axios";

import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

//fetch with "getServerSideProps"
export async function getServerSideProps() {
	//http request
	const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`);
	const res = await req.data.data.data;

	return {
		props: {
			posts: res ?? [], // <-- assign response
		},
	};
}

function PostIndex(props) {
	const { posts } = props;

	const router = useRouter();

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const deletePost = async (id) => {
		await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);
		refreshData();
	};

	return (
		<Layout>
			<div className="container" style={{ marginTop: "80px" }}>
				<div className="row">
					<div className="col-md-12">
						<div className="card border-0 shadow-sm rounded-3">
							<div className="card-body">
								<Link href="/posts/create" className="btn btn-primary border-0 shadow-sm mb-3" passHref>
									TAMBAH
								</Link>
								<div className="table-responsive">
									<table className="table table-bordered mb-0">
										<thead>
											<tr>
												<th scope="col">IMAGE</th>
												<th scope="col">JUDUL</th>
												<th scope="col">CONTENT</th>
												<th scope="col">AUTHOR</th>
												<th scope="col">POST DATE</th>
												<th scope="col">AKSI</th>
											</tr>
										</thead>
										<tbody>
											{posts.map((post) => (
												<tr key={post.id}>
													<td className="text-center">{post.image ? <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} width="100" className="rounded-3" /> : "Gambar tidak tersedia"}</td>
													<td style={{ maxWidth: "150px" }}>{post.title}</td>
													<td style={{ maxWidth: "250px" }}>{post.content}</td>
													<td>{post.author}</td>
													<td>{post.post_date}</td>
													<td className="text-center" style={{ maxWidth: "90px" }}>
														<Link href={`/posts/edit/${post.id}`}>
															<button className="btn btn-sm btn-icon border-0 shadow-sm mb-3 me-3">
																<FontAwesomeIcon icon={faEdit} className="text-primary" />
															</button>
														</Link>
														<button onClick={() => deletePost(post.id)} className="btn btn-sm btn-icon border-0 shadow-sm mb-3">
															<FontAwesomeIcon icon={faTrash} className="text-danger" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default PostIndex;
