import React, { useState, useEffect } from "react";
import Card from './Card'
import PokemonData from "./PokemonData";
import axios from "axios";

const Main=()=>{
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async()=>{
        setLoading(true);
        const res = await axios.get(url)
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    }

    const getPokemon=async(res)=>{
        res.map(async(item)=>{
            const result=await axios.get(item.url);
            setPokemonData(state=>{
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)   
                return state;
            })
        })
    }

    useEffect(()=>{ 
        pokeFun();
    }, [url])

    return(
        <>
            <div className="container">
                <div className="left-container">
                    <Card pokemon={pokemonData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    <div className="buttons">
                        { prevUrl && <button onClick={()=>{
                            setPokemonData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokemonData([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>
                <div className="right-container">
                    <PokemonData data={pokeDex}/>
                </div>
            </div>
        </>
    )
}

export default Main;