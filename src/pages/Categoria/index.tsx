import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { PageTitle } from '../../components/GlobalStyle';
import { ListaCategorias } from '../../components/ListaCategorias';
import ListaPosts from '../../components/ListaPosts';
import { search } from '../../services/api';
import Subcategoria from '../Subcategoria';
import * as Styled from '../../components/ListaCategorias/styles';

const Categoria = (): JSX.Element => {
	const { id } = useParams();
	const [subcategorias, setSubcategorias] = useState([]);

	useEffect(() => {
		search(`/categorias/${id}`, (categoria: any) => setSubcategorias(categoria.subcategorias));
	}, [id]);
  
	return (
		<main className='container'>
			<PageTitle>Pet notícias</PageTitle>
			<ListaCategorias />
      
			<Styled.ListCategoria className='flex'>
				{
					subcategorias.map(subcategoria => (
						<Styled.LinkCategoria 
							to={`${subcategoria}`}
							key={subcategoria}
							categoria={id}
						>
							<li>
								{subcategoria}
							</li>
						</Styled.LinkCategoria>
					))
				}
			</Styled.ListCategoria>

			<Routes>
				<Route path={'/'} element={<ListaPosts url={`/posts?categoria=${id}`} />} />
				<Route path={':subcategoria'} element={<Subcategoria />} />
			</Routes>
		</main>
	);
};

export default Categoria;
