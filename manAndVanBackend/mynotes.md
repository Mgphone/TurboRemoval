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
