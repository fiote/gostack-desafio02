import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
	const [repos,setRepos] = useState([]);

	async function handleAddRepository() {
		const title = prompt('Repo Name');
		const response = await api.post('/repositories',{title});
		const repo = response.data;
		setRepos([...repos, repo]);
	}

  	async function handleRemoveRepository(id) {
	  	const index = repos.findIndex(repo => repo.id == id);
	  	if (index >= 0) {
	  		await api.delete('/repositories/'+id);
			const newlist = Array.from(repos);
			newlist.splice(index,1);
			setRepos(newlist);
		}
	}

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepos(response.data);
		});
	},[]);

  	return (
		<div>
			<ul data-testid="repository-list">
				{repos.map(repo => <RepoBox key={repo.id} repo={repo} handler={handleRemoveRepository} />)}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

const RepoBox = ({ repo, handler }) => {
	return (
		<li>
			{repo.title}
			<button onClick={() => handler(repo.id)}>
			Remover
			</button>
		</li>
	)
}

export default App;
