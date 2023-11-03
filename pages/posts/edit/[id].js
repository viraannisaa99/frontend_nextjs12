//import hook useState
import { useState } from "react";

//import router
import Router from "next/router";

//import layout
import Layout from "../../../components/layout";

//import axios
import axios from "axios";

import Cookies from "js-cookie";

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }) {
	//http request
	const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${params.id}`);
	const res = await req.data.data;

	return {
		props: {
			post: res, // <-- assign response
		},
	};
}

function PostEdit(props) {
	//destruct

	const token = Cookies.get("token");
	const { post } = props;

	//state
	const [image, setImage] = useState("");
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [author, setAuthor] = useState(post.author);
	const [post_date, setPostDate] = useState(post.post_date);

	//state validation
	const [validation, setValidation] = useState({});

	//function "handleFileChange"
	const handleFileChange = (e) => {
		//define variable for get value image data
		const imageData = e.target.files[0];

		//check validation file
		if (!imageData.type.match("image.*")) {
			//set state "image" to null
			setImage("");

			return;
		}

		//assign file to state "image"
		setImage(imageData);
	};

	//method "updatePost"
	const updatePost = async (e) => {
		e.preventDefault();

		//define formData
		const formData = new FormData();

		//append data to "formData"
		formData.append("image", image);
		formData.append("title", title);
		formData.append("content", content);
		formData.append("author", author);
		formData.append("post_date", post_date);
		formData.append("_method", "PUT");

		//send data to server
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		await axios
			.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${post.id}`, formData, {
				headers: {
					Accept: "application/json",
				},
			})
			.then(() => {
				//redirect
				Router.push("/posts");
			})
			.catch((error) => {
				//assign validation on state
				if (error.response.status == 401) {
					alert(error.response.data.message);
				} else if (error.response.status == 422) {
					setValidation(error.response.data);
				}
			});
	};

	return (
		<Layout>
			<div className="container" style={{ marginTop: "80px" }}>
				<div className="row">
					<div className="col-md-12">
						<div className="card border-0 rounded shadow-sm">
							<div className="card-body">
								<form onSubmit={updatePost}>
									<div className="form-group mb-3">
										<label className="form-label fw-bold">Image</label>
										<input type="file" className="form-control" onChange={handleFileChange} />
									</div>

									<div className="form-group mb-3">
										<label className="form-label fw-bold">TITLE</label>
										<input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
									</div>
									{validation.title && <div className="alert alert-danger">{validation.title}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">CONTENT</label>
										<textarea className="form-control" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Content" />
									</div>
									{validation.content && <div className="alert alert-danger">{validation.content}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">Author</label>
										<input className="form-control" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Masukkan Author" />
									</div>
									{validation.author && <div className="alert alert-danger">{validation.author}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">POST DATE</label>
										<input className="form-control" type="date" value={post_date} onChange={(e) => setPostDate(e.target.value)} placeholder="Masukkan Tanggal Post" />
									</div>
									{validation.post_date && <div className="alert alert-danger">{validation.post_date}</div>}

									<button className="btn btn-primary border-0 shadow-sm" type="submit">
										UPDATE
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default PostEdit;
