import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";

const Body =()=>{

    const [listOfRestaurants,setListOfRestaurants] = useState();
    const [filteredRestaurants,setFilteredRestaurants] = useState();

    const [searchText, setSearchText] = useState("");

    const Topratedrestaurants =()=>{

        const filteredList = listOfRestaurants.filter((allData)=>{
            return allData.info.avgRating > 4.3;
        });
        setFilteredRestaurants(filteredList);
        
    }
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async ()=>{
        const data = await fetch("https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.632986&lng=77.219374&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        // console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    return listOfRestaurants == undefined ? (<Shimmer/>):(
        <>
            <div className="body">

                
                
                <div className="filter">
                    <button className="filter-btn" onClick={Topratedrestaurants}>Top rated Restaurants</button>

                    <div className="search">
                    
                        <input type="text" className="search-box" placeholder="Search for restaurants" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                        <button onClick={()=>{
                            console.log(searchText);
                            const filteredList = listOfRestaurants.filter((allData)=>{

                                return allData.info.cuisines.toString().toLowerCase().includes(searchText.toLowerCase());

                            });

                            console.log(filteredList);
                            setFilteredRestaurants(filteredList);
                            
                            }}>Search</button>

                    </div>

                </div>
                <div className="res-container">
                {
                    filteredRestaurants?.map((res, index)=>{
                        
                        
                        return (
                            <div key={index}>
                        <RestaurantCard resData={res} />
                        </div>)
                        
                    })
                }
                {/* <RestaurantCard resData ={resObj}/> */}
                
                </div>
                
                <div className="">
                    <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">CLICK to start API</a>
                </div>

            </div>
        </>
    )
}

export default Body;