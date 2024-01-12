BackEnd Commit
for fourth commit..
Node i have got big problem with async and await checked
Node-fetch@2.. can not update to the latest if i did module not found. checked
there will be 2 env .. be careful node is root directory of Node backend checked
require("dotenv").config(); need only once at entry point and can use the whole application checked
update the distance function (Haversine) coz it not show actual road distance.checked
for fifth commit...
i can see JSON.stringify for object checked
if there is some errors can check with if statement checked
i am stuck for long time in the invalid postcode..!becareful checked
for sixt commit..
add the time for json..checked
one function two outputs using object checked
when i use the best way is make a variable result and with using . dot checked
add timeConverter.. module.export=timeConverter checked
use a lot of template literal checked
for seventh commit..checked
delete node-fetch use fetch checked
fix the bug for lng and lat in api call checked
clear the comments checked

FrontEnd Commit
for eight commit
Final set up for react front end checked
react-router becareful for component when error make sure see console first\*\* checked
install react icons and react router dom checked
for 14 commit
1.loadscript for map need to add at the top level coz can use the whole application checked
2.front end when i am trying to pass the autocomple. api is not working for getPlaces()
3.that mean i can not reply for libray checked
4.use onload(setData) and check with if and result out for .formatted checked
5.normal set up for booking.js
for commit 15
1.URLSearchParams is search for ? and & value checked
2.usecontext firstly create, then pass to context provider with {children} after that when i want to use with use the usecontext checked
this is chatgpt
Create a Context: You define a context using createContext in a separate file, and this context acts as a data container.

Wrap Your Application with the Context Provider: You create a context provider component that wraps your application or specific parts of it. The context provider sets up the context and manages the shared data. It typically uses useState to provide a way to change the shared data. It also accepts the {children} prop to ensure that the components inside the provider can access the context.

Use useContext in Specific Components: In the components where you want to access and use the shared data from the context, you use the useContext hook. This allows you to retrieve and use the context's data within those components without needing to pass it explicitly through props.

commit 16,17,18
need to think about form sumbmit..checked
form action="handleform"that is traditional static checked
form action="/handleform" method"post or get" that is node express checked
form onsubmit={handleform} that is react checked

commit 19,
i use usecontext to all my state checked
in home page i pass location, destination by usecontext checked
if user come back to home page all my data reset checked
to data reset i use useLocation, and then find the path,set data to initial Data of context by using useffect checked

commit 35,
we use the props ..noted
when we use don't forget checked={checked===value} noted
because we want to use change e.target.value noted
on the radioonChange function firstly check e.target.value and usecontex same or not noted
then setData by usecontext noted

commit 36,
That is only good for full choose list
If i don't want user not to enter  
can try with customInput readonly props
type, value, onClick, readonly
example
const customInput=({value,onClick})=>(
<input type=text readOnly value={value} onClick={onClick}
/>)

custom Input fields as customInput={<CustomInput />}
using react-datePicker

commit 39,
for react and node proxy connecting fetch
you don't need full URL address just /retrieve ?? /your end point noted

commit 40,
When you fetch with server react to node
method(return promise), header(authorization), body(data passing) noted

commit 41,
connect node and react there is so many ways but i use proxy for this example noted
app.get is just want to get data from server note
app.post is write and can read noted

commit 42,
(react)
pass pros as useState data to component noted
when declare variable checked with ternary value is in or not noted
add time and distance noted
option time value with nested loop noted

commit 43,
(react)
add hour to the context data(noted)
just add onchange to select and setData(noted)

commit 44,
(react node)
for calulating the result there are two ways do in server or client noted
i will choose semi calcuate one for react like not too much to change noted
for time i just use second and calculate in react noted
just show the hour need and update to the server noted

coomit 45,
(react)
i believe mainly when i when to use popup css is maily important noted
display none && some features at css noted

commit 47,
(node)
trying to add only in the quote and will update(noted)..
parseInt is just only will take the number.. and have to use two parmeter.. parseInt(part,10(it can be base number) noted
for the stair i just change on the server noted

commit 48
(node,react)
add nodemon for development at node noted
bug fixed for stair firstly checked if there is value or not first then use ternary opertor noted
in react check all with && to display noted

commit 49,
(react)
e.stopPropagation is prevent bubble phrase(parets(root of DOM tree)) noted
Prevent the click event from propagating further noted
in my close button on floating.. i nested parent .. and example of need to use stopPropagation noted

commit 50,
(react,node)
change image for vansize, change image of help required noted
update the floating div noted

commit 53,
(react)
i use array.slice 1,array.length-1 it mean cancel first and less array noted

commit 58,
(react,node)
for node i use mongoose and atlas server noted
commit 59,
(node)
using cors whitelist to access
logs whois in by creating log file(fs,path,morgan) library noted

commit 59,
(node, react)
to access from LAN
1.make a white list of node server ip (noted)
2.when u fetch from the client make sure node server ip address(NOT 127.0.0.1)(noted)

commit 62,
(node)
i change my server.js to easy to read, by changing logger.js middleware file (noted)
for morgan you can log http request on nodejs application (noted)
when u use need fs, path and morgan..
1.check file exit or not and create or update for folder
2.inside the folder add .log
3.use morgan and write the logs

commit 63
(node,mongodb,react)
firstly i need to setup mongo atlas (noted)
then create the mongo schema (noted)

Node server side
Creating Schema with Model
1.I use mongoose
2.mongooseSchema
3.think for the data type.
4.module.exports=mongoose.model("Retrieve",retrieveSchema)
call this model

save database
5.newRetrieve=new Retrieve(req.body)
6.const someName=await newRetieve.save()

7.send it to client if save is complete
res.status(200).json({ message: "Data received", data: savedData });
anything with 200 codes

client react side
in react i have to fetch becareful of cors(noted)
then i use endpoint for server /saveretrieve and method,headers,body(noted)
then check server sending code json.. (noted)(
if received alert and goback to home(noted)
to go back i use useNavigate..react router dom(noted)
import useNavigate, navigate=usenavigate and navigate("/")

commit 64,
when you create model for schema be aware the same value to save data for mongodb..(noted)
{ date: String,
quote: Object,
randomNumber: Number,
},date,quote,randomNumber have to be same name in both!!

commit 65,
(node)
Change server.js and use express.router()
1.call express.router
2.router.post get patch delete but extension has to be ("/",req,res)=>{})
3.file exports.module=router
in the server.js
4.app.use("/your route",required(file location))

commit 66,
(node)sending email when data save to server
using nodemailer (noted)
1.they can use so many mail services including GMail.
2.to use gmail make 2 step vertification 3. enable app password
4.import nodmailer with require
5.variable and createTransport with object of service and auth:
6.mail options object.. {from,to,subject,text(html)} 7. const info = await transport.sendMail(mailOptions);

commit 67,
(react)
add another page for retrieve (noted)

commit 69,
(node,react)
in backend
database connection fetch url?randomNumber=${number} at the end of ? is query (noted)
in http don't use a lot of close database and open database head to error(noted)
if error send res.status(404).json good res.json() (noted)
in frontend
fetch url with ?query (noted)
use try catch if response.ok use useState (noted)

commit 70,
display retieve data
(react)
front end
I add nested container to the app (noted)
nested container to 100vh and flex column
because i can do .footer to margin-top auto to not overlap word and will stay bottom (noted)
if i fetch and get the json.. make a varibale first to be easy(noted)

commit 72,
(react,node)
node
stripe sending back client_secret to frontend and save
change database connection to server.js(noted)
in my model i add paymentStatus and paymentIntedId(noted)
from the data of front i took only \_id(noted)
for secruity safety i will research again the whole data of server(noted)
to check the data type i can use model(Retrieve) Retrieve.findbyId()
react
in react i just only show all the data (noted)
i post request to the alldata to the server (noted)

commit 75,
(react,node)
there are thrree ways to use stripe
1.Payment Intents(allow more complex)
2.Direct Link just the link
3.Checkout Sessions(create session and ) sending failer and success page
Node
I make react router for payment bookingpayment router in node(noted)
react
I send backend and send my req.body with all quotes data (noted)

commit 77
(react,node)
node
using stripe.checkout.sessions.create (noted)
use like stripe documentation (noted)

when stripe go to success i use params of reactrouter (noted)
everytime i pass i save to my mongodatabase (noted)
there is two endpoint for server side
a.send success to stripe and save to the database(noted)
b.send success and change the database datatype(noted)
In the success i use the params of reactrouter as follows
a.{useSearchParams} from react-router-dom
b.[searchParams]=useSearchParams
c.session_id=searchParms.get("session_id) this is the weblink end with ? as bottom
http://192.168.1.216:3000/paymentbooking/success?session_id=adfaldkjfeo

commit 78
(node)
module.export emailservice (noted)

commit 79
(node)
when u module exports u have to be same order...if u swap there is an error(noted)

commit 80
(node)
for mail options i call name,email with || and add above variable(noted)
commit 82
(react)
done for location page(noted)
i just use only react google api (noted)
commit 88
(react)
declare two usestates one for isHover(tocheckMouse) data(toReceiveData)(noted)
use useEffect fetchData (noted)
['s''m''l''xl'] .includes(value) if true I find what i want on my modules(noted)
for true there is two ways i know one is Array.isArray(mydatareceive)
or typeof (mydatareceive)==="object"(noted)
to get Object data can use JSON.Stringify.. hasOwnProperty Object.entries(noted)
Object.entries.map([key,value])=>{key}:{value}
commit 91
(react)
booking page don't want to run without addresses(noted)
a.make a new page /booking for <Private /> Component
b.In the Component I call Home and Booking
c.Call my use Context and check addreess if greate or equal with two(noted)

commit 102
change main to turboremoval(noted)
stuck problem in cors(noted)
need difference api for cors(noted)
fetch revie from the back and send to the react(noted)

commit 103
i want to use google review but server is not accept with cors (problem)
i use two type one for wildcards to accept (noted)
one for normal route(noted)

commit 105
services link to location
1.for the link in react router i use array type to check if there is the value accept otherwise not found(noted) 2. for the link "-" and "space" i use template literal(noted) str.replace
3.i can use /:id that is the most important thing for this commit(noted)
/:id and add the component and {id}=useParams() from reactRouter(noted)
