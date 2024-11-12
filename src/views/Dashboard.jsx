import Navbar from "../components/Navbar";
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">React + Laravel</h1>
          <p className="fs-4 col-md-8">
            Belajar CRUD dengan React dan Laravel 11
          </p>
        </div>
      </div>
    </>
  );
}
