/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    email: 'jack@gmail.com',
    age: 25,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    email:'rose@gmail.com',
    age: 22,
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  const { traveller } = props;
  return (
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.age}</td>
      <td>{traveller.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Age</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {travellers.map((traveller) => (
            <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const newTraveller = {
      id: this.props.nextId,
      name: form.travellername.value,
      phone: form.phone.value,
      email: form.email.value,
      age: form.age.value,
      bookingTime: new Date(),
    };
    if (this.props.travellers.length >= this.props.totalSeats) {
      alert('Cannot add traveller: All seats are booked.');
    } else {
      this.props.bookTraveller(newTraveller);
      alert('Traveller added successfully.');
      this.props.updateDisplay();
    }
    form.travellername.value = '';
    form.phone.value = '';
    form.email.value = '';
    form.age.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <input type="text" name="phone" placeholder="Phone" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="number" name="age" placeholder="Age" required/>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const nameToDelete = form.travellername.value;
    if (this.props.travellers.length === 0) {
      alert('Cannot delete traveller: No travellers in the database.');
    } else {
      const travellerExists = this.props.travellers.some((traveller) => traveller.name.toLowerCase() === nameToDelete.toLowerCase());
      if (!travellerExists) {
        alert('Traveller not found in the database.');
      } else {
        this.props.deleteTraveller(nameToDelete);
        alert('Traveller deleted successfully.');
        this.props.updateDisplay();
      }
    }
    form.travellername.value = '';
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	      <input type="text" name="travellername" placeholder="Name" required/>
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const { totalSeats, travellers } = this.props;
    const reservedSeats = travellers.length;
    const freeSeats = totalSeats - reservedSeats;
	  return (
      <div>
        <h3>Seat Availability</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '200px' }}>
          {[...Array(totalSeats)].map((_, index) => (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                border: '1px solid black',
                backgroundColor: index < reservedSeats ? 'grey' : 'green',
                margin: '5px',
              }}
            ></div>
          ))}
        </div>
        <p>Total Seats: {totalSeats}</p>
        <p>Free Seats: {freeSeats}</p>
        <div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>  
          <div style={{ width: '20px', height: '20px', backgroundColor: 'grey', marginRight: '5px' }}></div>
          <span>Reserved Seats</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'green', marginRight: '5px' }}></div>
          <span>Free Seats</span>
        </div>
      </div>
    </div>
	  );
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 'homepage', totalSeats: 10, nextId: 3 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, passenger],
        nextId: prevState.nextId + 1,
      }));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => {
      const { travellers } = prevState;
      const updatedTravellers = travellers.filter((traveller) => traveller.name.toLowerCase() !== passenger.toLowerCase());
      return { travellers: updatedTravellers };
    });
  }
  updateDisplay() {
    this.setState((prevState) => ({ travellers: [...prevState.travellers] }));
  }
  render() {
    const { travellers, selector, totalSeats, nextId } = this.state;
    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div>
          <button onClick={() => this.setSelector('homepage')}>Homepage</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
          <button onClick={() => this.setSelector('add')}>Add Traveller</button>
          <button onClick={() => this.setSelector('delete')}>Delete Traveller</button>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {selector === 'homepage' && (
            <Homepage totalSeats={totalSeats} travellers={travellers} />
          )}
          {selector === 'display' && <Display travellers={travellers} />}
          {selector === 'add' && <Add bookTraveller={this.bookTraveller} nextId={nextId} travellers={travellers} totalSeats={totalSeats} updateDisplay={this.updateDisplay} />}
          {selector === 'delete' && <Delete deleteTraveller={this.deleteTraveller} travellers={travellers} updateDisplay={this.updateDisplay} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
