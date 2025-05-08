import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import Header from "../components/Header";

const HomePage = () => {
  const apiurl = useFetch("http://localhost:3000/api/categories");
  const { data, loading, error } = apiurl; // Destructure data, loading, and error from apiurl
  

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
                      src={`https://placehold.co/400x200?text=${item.name}`}
                      alt={item.name}
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
  
        {/* Niche wali badi image */}
        <div className="my-5 text-center">
          <img
            src="https://placehold.co/1200x400?text=Big+Promotional+Image"
            alt="Promo Banner"
            className="img-fluid"
          />
        </div>
  
        {/* New Arrival & Summer Collection Boxes */}
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
