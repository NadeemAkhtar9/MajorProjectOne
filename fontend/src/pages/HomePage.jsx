import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from "../components/Header";

const HomePage = () => {
  const apiurl = useFetch("https://major-project-one-backend-eight.vercel.app/api/categories");
  const { data, loading, error } = apiurl; 
  const categoryImages = {
    Clothing: "https://images.freeimages.com/images/large-previews/fe1/stylish-outerwear-collection-0410-5700321.jpg?fmt=webp&h=250",
    Electronics: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=60",
    Furniture: "https://media.istockphoto.com/id/1304422715/photo/beautiful-decorative-yellow-colored-handcrafted-wooden-hanging-garden-balcony-chairs.webp?a=1&b=1&s=612x612&w=0&k=20&c=HIySqVo9jXOXChIEOpG5GEtxWz_PPl4O9CqIcTWhCCA=",
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        {data && data.length > 0 ? (
          <div className="row">
            {data.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <img
                      className="img-fluid"
                      src={categoryImages[item.name]}
                      alt={item.name}
                      style={{ height: "200px", objectFit: "cover", width: "100%" }}
                    />
                    <div className="mt-3 text-center">
                      <Link to={`/category/${item._id}`} className="card-title">
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No categories available.</p>
        )}
  
       
        <div className="my-5 text-center">
          <img
            src="https://images.unsplash.com/photo-1657812159103-1b2a52a7f5e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlJTIwcHJvbW90aW9uYWwlMjBwYWdlfGVufDB8fDB8fHww"
            alt="Promo Banner"
            className="img-fluid"
            style={{ height: "600px", objectFit: "cover", width: "100%" }}
          />
        </div>
  
       
        <div className="row text-center mb-5">
          <div className="col-md-6">
            <div className="p-4 border rounded shadow-sm bg-light">
              <h3>New Arrival</h3>
              <p>Explore the latest trends and styles.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 border rounded shadow-sm bg-light">
              <h3>Summer Collection</h3>
              <p>Fresh looks perfect for the season.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default HomePage;
