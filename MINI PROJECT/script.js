
alert("JS LOADED");





let transactions=[];

function createTransaction({amount , category , type , note}){            // curly bracket jruri h 

   return {
      id: Date.now(),
      amount: Number(amount),
      category,
      type,
      note,
      date:new Date().toISOString()
   }

}
     // yaha par data me poora object hi type krna hoga naaki sirf values and strings


function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));

  
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("transactions");
  transactions = data ? JSON.parse(data) : [];
}



function addTransactions(data){
   const tx= createTransaction(data);                       // tx ek single object h 
   transactions.push(tx);
   saveToLocalStorage();
  recalculate();

}

// addTransactions(
//    {
//       amount:Number(1000),
//       category:"food",
//       type:"outflow",
//       note:"hi"
       
//    }
// );

// console.log(transactions);

function getTotalinflow(){
    return transactions
   .filter(n=>n.type==="inflow")
   .reduce((sum,n)=>sum+n.amount,0);                          // n me aur numbers bhi ho skte h to clarification ke liye
}

function getTotaloutflow(){
    return transactions
   .filter(n=>n.type==="outflow")
   .reduce((sum,n)=>sum+n.amount,0);    
}

function getTotalbalance(){
   return getTotalinflow() - getTotaloutflow();
}


const totalamount = document.querySelector(".total-amount");
const inflowvalue = document.querySelector(".inflow");
const outflowvalue = document.querySelector(".outflow");



function recalculate(){

   const inflowE = getTotalinflow();
   const outflowE= getTotaloutflow();
   const totalbalance=getTotalbalance();
                                                         // this part took me more than 1.5 hours
   
totalamount.innerText=`${totalbalance}`;
inflowvalue.innerText=`${inflowE}`;
outflowvalue.innerText=`${outflowE}`;
}



const plusbtn = document.querySelector(".plusbtn");
const modal = document.querySelector(".form");

plusbtn.addEventListener("click", () => {
  modal.classList.add("open");
});


let save=document.querySelector(".save");
save.addEventListener("click" , ()=>
{
   const amount=Number(document.querySelector(".amount-input").value);
   const category=document.querySelector(".category").value;
   const type=document.querySelector(".type").value;
   const note=document.querySelector(".note").value;
   addTransactions({
   amount:amount,
   category:category,
   type:type,
   note:note

});


     modal.classList.remove("open");
});


plusbtn.addEventListener("click", () => {
  console.log("PLUS CLICKED");
  modal.classList.add("open");
});



