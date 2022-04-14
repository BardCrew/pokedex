import React from "react";

const Card=({pokemon, loading, infoPokemon})=>{
    console.log(pokemon);
    return(
        <>
            {
                loading ? <h1>LOading...</h1>:
                pokemon.map((item)=>{
                    return(
                        <>
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                                {
                                    item.types.map(poke=>{
                                        return(
                                            <div>
                                                <h3>{poke.type.name}</h3>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Card;