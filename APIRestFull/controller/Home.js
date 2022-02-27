const Home = {
    index(request, response) {
        response.json({ 'name': 'William Bruno', "email" : "wbruno@gmail.com" });
    }
}

export default Home;