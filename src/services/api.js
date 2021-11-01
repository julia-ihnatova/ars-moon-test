import axios from "axios";

const axiosClient =  axios.create({
  baseURL: "https://dog.ceo/api"
});

export const getAllBreedsFromApi = async() => {
  try{
    const { data } = await axiosClient.get("breeds/list/all");
    return data;
  }catch(er){
    console.log(er)
  }
}

export const getBreedRandomImageFromApi = async(name) => {
  try{
    const { data } = await axiosClient.get(`breed/${name}/images/random`);
    return data;
  }catch(er){
    console.log(er)
  }
}


export const getSelectedBreedImagesFromApi = async(name) => {
  try{
    const { data } = await axiosClient.get(`breed/${name}/images`);
    return data;
  }catch(er){
    console.log(er)
  }
}





