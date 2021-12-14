const API_URL = "http://157.90.237.150/api/v1/";

/*
 * Classe pour récupérer les données de l'utilisateur 
 */
class SportivesInformations{
    async getSportivesAround(dataInfo) {
        const headers = {"Authorization": "Bearer " + localStorage.getItem('token')};
        const requestOptions = {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(dataInfo)
        }
        const response = await fetch(API_URL + 'athletes/me', requestOptions);
        const data = await response.json();
        if (!response.ok){
            const error = (data) || response.status;
            return Promise.reject(error);
        }
        return data
    }
}

export default new SportivesInformations();