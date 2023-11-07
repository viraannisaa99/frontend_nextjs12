import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/layout";

// main react componnent for page
function PostIndex() {
	/**
	 * useState digunakan untuk menambah atau mengupdate state.
	 * create state variable bernama posts untuk menampung list data posr
	 * state akan terupdate saat fetch/delete posts dengan menggunakaan setPosts
	 */
	const [posts, setPosts] = useState([]);
	const router = useRouter(); // access router object

	/**
	 * fetch list posts dari endpoint API dan tambahkan header authorization untuk menerapkan token
	 * set posts stat dengan response data
	 */
	const fetchData = async () => {
		try {
			const token = Cookies.get("token");
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setPosts(response.data.data.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	/**
	 * useEffect digunakan untuk menjalankan fungsi pada komponen saat mounting
	 * atau saat komponen diupdate.
	 *
	 * useEffect memungkinkan kita untuk melakukan side effect di dalam komponen fungsiional.
	 * Side effect adalah tindakan yang tidak langsung terkait dengan rendering dari komponen,
	 * seperti menanggil API atau mengatur event listener.
	 *
	 * run fetchdata ketika komponen dimount/dipadang.
	 * pstikan bahwa data diambil dan ditampilkan saat halaman pertama kali dirender
	 */
	useEffect(() => {
		fetchData();
	}, []);

	const deletePost = async (id) => {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);
			fetchData();
		} catch (error) {
			console.error("Error deleting post:", error);
		}
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
