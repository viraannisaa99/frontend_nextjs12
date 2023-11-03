//import hook useState
import { useState } from "react";

//import router
import Router from "next/router";

//import layout
import Layout from "../../../components/layout";

//import axios
import axios from "axios";

import Cookies from "js-cookie";

function PostCreate() {
	const token = Cookies.get("token");

	//state
	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [post_date, setPostDate] = useState("");

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

	//method "storePost"
	const storePost = async (e) => {
		e.preventDefault();

		//define formData
		const formData = new FormData();

		//append data to "formData"
		formData.append("image", image);
		formData.append("title", title);
		formData.append("content", content);
		formData.append("author", author);
		formData.append("post_date", post_date);

		//send data to server
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		await axios
			.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`, formData, {
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
				setValidation(error.response.data.message);
			});
	};

	return (
		<Layout>
			<div className="container" style={{ marginTop: "80px" }}>
				<div className="row">
					<div className="col-md-12">
						<div className="card border-0 rounded shadow-sm">
							<div className="card-body">
								<form onSubmit={storePost}>
									<div className="form-group mb-3">
										<label className="form-label fw-bold">Image</label>
										<input type="file" className="form-control" onChange={handleFileChange} />
									</div>
									{validation.image && <div className="alert alert-danger">{validation.image}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">TITLE</label>
										<input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Judul" />
									</div>
									{validation.title && <div className="alert alert-danger">{validation.title}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">CONTENT</label>
										<textarea className="form-control" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Isi Konten" />
									</div>
									{validation.content && <div className="alert alert-danger">{validation.content}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">AUTHOR</label>
										<input className="form-control" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Masukkan Author" />
									</div>
									{validation.author && <div className="alert alert-danger">{validation.author}</div>}

									<div className="form-group mb-3">
										<label className="form-label fw-bold">POST DATE</label>
										<input className="form-control" type="date" value={post_date} onChange={(e) => setPostDate(e.target.value)} placeholder="Masukkan Tanggal Post" />
									</div>
									{validation.post_date && <div className="alert alert-danger">{validation.post_date}</div>}

									<button className="btn btn-primary border-0 shadow-sm" type="submit">
										SIMPAN
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

export default PostCreate;
