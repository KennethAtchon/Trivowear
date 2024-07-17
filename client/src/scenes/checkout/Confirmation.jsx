const Confirmation = () => {
  return (
    <div className="m-90px auto w-80% h-50vh">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Success</strong>
        <span className="block sm:inline">
          You have successfully made an Order — <strong>Congrats on Making your Purchase</strong>
        </span>
      </div>
    </div>
  );
};

export default Confirmation;
