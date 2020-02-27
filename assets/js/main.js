$(document).ready(function(){
    navWrite(menu,".navbar-nav");
    footWrite(footer);
    $(window).scroll(navScroll);
    $(".navbar-toggler").click(function(){
        $("#navbarNavDropdown").slideToggle();
    });
    $(".navbar-nav a").click(function(){
        $("#navbarNavDropdown").slideUp();
        console.log("zatvorio sam");
    });
    
    //tickets.html
    if(window.location.href.indexOf("tickets.html")!=-1){
        countTotal();
        // console.log("tu smo");
        // console.log(JSON.parse(localStorage.getItem("tickets")));
        $.ajax({
            url:"players.json",
            method:"GET",
            dataType:"json",
            success:function(res){
                
            }
        });
        $(".oneless").on("click",function(){
            const count=Number($(this).parent().find(".number").html());
            let newCount;
            if(count>=1){
                newCount=count-1;

            }
            $(this).parent().find(".number").html(newCount);
            countTotal();
        })
        $(".onemore").on("click",function(){
            const count=Number($(this).parent().find(".number").html());
            let newCount;
            newCount=count+1;
            $(this).parent().find(".number").html(newCount);
            countTotal();

        })
        $(".remove").on("click",function(){
            $(this).parent().remove();
            countTotal();
        });
        $("#buy").click(function(){
            $("#coverDiv").show();
            $("#formContainer").addClass("scaleForm");
            $("body").addClass("bodyOpacity");
        });
        $("#close").click(function(){
            $("#formContainer").removeClass("scaleForm");
            $("#coverDiv").hide();
            $("body").removeClass("bodyOpacity");
        });
        function countTotal(){
            const allPrices=document.querySelectorAll(".price");
            const allQuantity=document.querySelectorAll(".number");
            let sum=0;
            for(let i=0;i<allPrices.length;i++){
                sum+=Number(allPrices[i].innerHTML)*Number(allQuantity[i].innerHTML);
            }
            document.querySelector("#total").innerHTML=sum;
        }
        //Regex
        const form=document.querySelector("#orderForm");
        const nameRegex=/^[A-Z][a-z]{2,}(\s[A-Z][a-z]{3,})+$/;
        const name=document.querySelector("#name");
        const mailRegex=/^[a-z][a-z\.\!\-]{4,}\@([a-z][a-z\.]{2,})+\.[a-z]{2,3}$/;
        const mail=document.querySelector("#mail");
        const adressRegex=/^([A-Z][a-z0-9\/\s]{3,})+$/;
        const adress=document.querySelector("#adress");
        const radioBtn=document.getElementsByName("payment");
        const terms=document.querySelector("#terms");
        const delivery=document.querySelector("#delivery");
        const paypalMsg=document.querySelector(".paypalMessage");
        let paymentMethod="";
        function textBox(regex,target){
            if(regex.test(target.value)){
                target.nextElementSibling.classList.remove("errorShow");
                return 1;
            }
            else{
                target.nextElementSibling.classList.add("errorShow");
                return 0;
            }
        }
        $("#name").blur(function(){
            textBox(nameRegex,name);
        });
        $("#mail").blur(function(){
            textBox(mailRegex,mail);
        });
        $("#adress").blur(function(){
            textBox(adressRegex,adress);
        });
        $("#delivery").change(ddlCheck);
        for(let i of radioBtn){
            i.addEventListener("change",inputPayment);
        }
        function inputPayment(){
            for(let i in radioBtn){
                if(radioBtn[i].checked){
                    if(radioBtn[i].value=="paypal"){
                        paypalMsg.innerHTML="Click to be directed to the PayPal™ site to authorize your payment.";
                    }
                    else{
                        paypalMsg.innerHTML="";
                    }
                    radioBtn[i].parentElement.lastElementChild.classList.remove("errorShow");
                    return 1;
                }
            }
            radioBtn[0].parentElement.lastElementChild.classList.add("errorShow");
            console.log(radioBtn[0].parentElement.lastElementChild);
            return 0;
        }
        $("input[name=payment]").change(inputPayment);
        function ddlCheck(){
            if(delivery.value!="0"){
                delivery.nextElementSibling.classList.remove("errorShow");
                return 1;
            }
            else{
                delivery.nextElementSibling.classList.add("errorShow");
                return 0;
            }
        }
        function finalCheck(){
            let ok=1;
            if(!terms.checked){
                ok=0;
                terms.parentElement.lastElementChild.classList.add("errorShow");
            }
            else{
                terms.parentElement.lastElementChild.classList.remove("errorShow");            
            }
            if(!textBox(nameRegex,name) != ""){
                ok=0;
            }
            if(! textBox(mailRegex,mail)){
             ok=0;
            }
            if(!textBox(adressRegex,adress)){
             ok=0;
            }
            if(!ddlCheck()){
             ok=0;
            }
            if(!inputPayment()){
             ok=0;
            }

            ok ? alertSuccess() : console.log("Nesto nije u redu");
        }
        $("#order").click(finalCheck);
        function alertSuccess(){
            const body=document.querySelector("body");
            let div=document.createElement("div");
            div.setAttribute("class","alert");
            div.setAttribute("class","alert-success");
            div.innerHTML="Success order!";
            body.appendChild(div);
            document.querySelector(".alert-success").classList.add("alert-slide");
            setTimeout(function(){
                document.querySelector(".alert-success").remove();
            },4000);
            form.reset();
        }
        
        
    }
    //End tickets.html

    //index.html
    else{
        let tickets=0;
        let arrayID=[];
        const image=["assets/images/gallery1(2).jpg","assets/images/gallery2(1).jpg","assets/images/gallery3.jpg","assets/images/gallery4(1).jpg","assets/images/gallery5(1).jpg","assets/images/gallery6(1).jpg","assets/images/gallery7(1).jpg","assets/images/gallery8(1).jpg"];
        function galleryWrite(arr){
            const ul=document.querySelector(".slider");
            console.log(ul);
            let html=``;
            for(let i of arr){
                html+=`
               <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
               <div class="galleryImg overflow-hidden">
                <img src="${i}" class="img-fluid" alt="slide1"/>
               </div>
               </div>`;
            }
            ul.innerHTML+=html;
        }
        galleryWrite(image);     
        //News AJAX
        $.ajax({
            url:"news.json",
            method:"GET",
            dataType:"json",
            success:function(res){
                writeNews2(res);
                $(".newsText").addClass("hide");
                $(".newsText:first-child").addClass("show");
                $(".newsLinks").on("click",function(e){
                    newsSliding(e);
                });
            }
        });
        //Players AJAX
        $.ajax({
            url:"players.json",
            method:"GET",
            dataType:"json",
            success:function(res){
                playerWrite(res);
                player=res;
                ddl(res);
            }
        });
        $.ajax({
            url:"matches.json",
            method:"GET",
            dataType:"json",
            success:function(res){
                ticketsWrite(res);
            }
        })
        
        //writeNews2(news);
        $(".sort").click(function(){
            sort(this);
            $(".sort").toggleClass(" text-primary");
        })
        
        $("#statFilter").change(function(){
            sortStat(this.value,player);
        })
        $("#playerSearch").on("input",playerSearch);
        $(".radioBtn input[type=radio]").change(function(){
            $(".radioBtn label").removeClass("active");
            $(this).parent().find("label").addClass("active");
            console.log($(this).val(),typeof $(this).val());
            gameType($(this).val());
        });
        $(".ticketButton").click(function(){
            if(tickets>0){
                window.location.href="tickets.html"
            }
            
        });
        
        function writeNews2(arr){
            let section=document.querySelector(".newsImage");
            for(let i of arr){
                section.innerHTML+=`<div class="image">
                <img src="${i.img.src}" alt="${i.img.alt}" />
                <a href="#${i.id}" class="newsLinks">
                    <h3 class="sectionHeading">${i.heading}</h3>
                </a>
            </div>`;
            }
            newsText(arr);
        }
        function newsText(arr){
            const section=document.querySelector(".textContainer");
            for(let i of arr){
                section.innerHTML+=`
                <div class="newsText" id="${i.id}">
                <h2 class="text-center p-2 p-md-4 sectionHeading">${i.heading}</h2>
                <p class="p-2 p-md-4">${i.readMore}</p>
                </div>`;
            }
        }
        function newsSliding(e){
            e.preventDefault();
            $(".newsText").hide();
            $(".newsText").removeClass("newsSlide");
            const link=$(e.currentTarget).attr("href");
            console.log(link);
            $(link).show().addClass("newsSlide");
            //$(link).fadeIn();
            //Skroluje do odredjene vesti na malim rezolucijama
            if($(window).width()<=767){
                $([document.documentElement]).animate({
                    scrollTop: $(".textContainer").offset().top
                }, 800);
            }
        }
        function playerWrite(arr){
            const body=document.querySelector(".player tbody");
            //<td class="my-auto pt-4">${item.name}</td>
            let row="";
            for(let item of arr){
                //const row=document.createElement("tr");
                //row.setAttribute("class","my-auto");
                row+=`<tr class="my-auto">`;
                row+=`
                <td class="my-auto pt-md-4">${item.number}</td>
                <td><img src="${item.img}" alt="${item.name.first+item.name.last} image"></td>
                <td class="my-auto pt-md-4">${item.name.first} ${item.name.last}</td>
                <td class="my-auto pt-md-4">${item.country}</td>
                <td class="my-auto pt-md-4">${item.age}</td>`;
                row+=playerStat(item.stats);
                let teams="";
                for(let i of item.teams){
                    teams+=`${i},`;
                }
                row+=`<td class="my-auto pt-md-4">${teams.substring(0,teams.length-1)}</td></tr>`;
                //body.appendChild(row);
            }
            body.innerHTML=row;
        }
        function playerStat(arr){
            let result="";
            for(let i in arr){
                result+=`
                <td class="my-auto pt-md-4">${arr[i]}</td>`;
            }
            return result;
        }
        //players(player);
        function sortStat(crit){
            $.ajax({
                url:"players.json",
                method:"GET",
                dataType:"json",
                success:function(res){
                    let criteria=crit;
                    res.sort((a,b)=>b.stats[criteria]-a.stats[criteria]);
                    playerWrite(res);
                }
            })
        }
        function sortStatAsc(crit){
            $.ajax({
                url:"players.json",
                method:"GET",
                dataType:"json",
                success:function(res){
                    let criteria=crit;
                    res.sort((a,b)=>a.stats[criteria]-b.stats[criteria]);
                    playerWrite(res);
                }
            })
        }
        function ddl(arr){
            const ddlFilter=document.querySelector("#statFilter");
            let html="";
            for(let i in arr[0].stats){
                html+=`<option value="${i}">${i.toUpperCase()}</option>`;
            }
            ddlFilter.innerHTML+=html;
        }
        function sort(e){
           const order=e.dataset.order;
           const criteria=document.querySelector("#statFilter").value;
           console.log(order);
           if(order=="asc"){
               sortStatAsc(criteria);
           }
           else{
               sortStat(criteria);
           }
        }
        function playerSearch(){
            const inputValue=document.querySelector("#playerSearch").value;
            $.ajax({
                url:"players.json",
                method:"GET",
                dataType:"json",
                success:function(res){
                    const newArr=res.filter(elem=>elem.name.first.toLowerCase().startsWith(inputValue.toLowerCase()) || elem.name.last.toLowerCase().startsWith(inputValue.toLowerCase()));
                    if(newArr.length==0){
                        const tablebody=document.querySelector(".player tbody");
                        tablebody.innerHTML=`<h3 id="notFound">Player not found <i class="fa fa-meh-o"></i></h3>`;
                    }
                    else{
                        playerWrite(newArr);
                    } 
                }
            })
        }
        function ticketsWrite(arr){
            const target=document.querySelector(".tickets");
            let html="";
            for(let i of arr){
                html+=`
                <section class="row w-sm-75 ticket p-3 mt-5 mx-auto">
                <div class="col-12 col-md-4 mx-auto">
                    <p class="font-weight-bold">${formatDate(i.dateTime.date).month} ${formatDate(i.dateTime.date).date} ${formatDate(i.dateTime.date).year}</p>
                    <p>${formatDate(i.dateTime.date).day}: ${i.dateTime.time} PM</p>
                </div>
                <div class="col-12 col-md-6">
                    <p class="font-weight-bold">${i.guestTeam} at ${i.homeTeam}</p>
                    <p>${i.stadium}-${i.state}</p>
                </div>
                <div class="col-12 col-md-2 text-center">
                    <span class="font-weight-bold pt-2">${i.price}$</span>
                    <button type="button" class="btn order btn-primary mt-2 ml-3" data-id="${i.matchId}">Order <i class="fa fa-ticket"></i></button>
                </div>
            </section>`;
            }
            target.innerHTML=html;
            const orderBtn=document.querySelectorAll(".order");
            for(let i of orderBtn){
                i.addEventListener("click",function(){
                    tickets++;
                    document.querySelector(".badge").innerHTML=tickets;
                    this.disabled=true;
                    this.innerHTML="Selected";
                    //localStorage.setItem("stavka",this.dataset.id);
                    addToStorage(this.dataset.id);
                })
            }
            
        }
        
        function addToStorage(id){
            arrayID.push(id);
            const stringifyArr=JSON.stringify(arrayID);
            localStorage.setItem("tickets",stringifyArr);
        }   
        function formatDate(date){
            const findDate=new Date(date);
            const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Avg","Sep","Oct","Nov","Dec"];
            const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return {
                day:days[findDate.getDay()],
                date:findDate.getDate(),
                year:findDate.getFullYear(),
                month:months[findDate.getMonth()]
            }
        }
        function gameType(crit){
            $.ajax({
                url:"matches.json",
                method:"GET",
                dataType:"json",
                success:function(res){
                    let filteredArray=res;
                    if(crit=="home"){
                        filteredArray=res.filter(elem=>elem.homeGame);
                    }
                    if(crit=="away"){
                        filteredArray=res.filter(elem=>!elem.homeGame);
                    }
                    console.log("gereg");
                    ticketsWrite(filteredArray);
                }
            })
        }
        //End index.html
    }

})
const menu=[{
    title:"News",
    link:"index.html/#news"
},
{
    title:"Roster",
    link:"#roster"
},
{
    title:"Tickets",
    link:"#tickets"
},
{
    title:"Highlights",
    link:"#highlights"
}];
const footer=[
    {
        icon:"fa fa-facebook",
        link:"https://www.facebook.com/"
    },
    {
        icon:"fa fa-twitter",
        link:"https://www.twitter.com/"
    },
    {
        icon:"fa fa-instagram",
        link:"https://www.instagram.com/"
    },
    {
        icon:"fa fa-youtube-play",
        link:"https://www.facebook.com/"
    }
]
let player;
function navWrite(res,elem){
    let htmlCode="";
    for(let i in res){
        htmlCode+=`<li class="nav-item">
        <a class="nav-link" href="${res[i].link}">${res[i].title}</a>
      </li>`;
    }
    $(elem).html(htmlCode);
}
function footWrite(arr){
    const target=document.querySelector("#navFoot");
    let html="";
    for(let i of arr){
        html+=`<li class="d-inline m-1">
        <a href="${i.link}" target="_blank"><i class="${i.icon}"></i></a>
      </li>`;
    }
    target.innerHTML=html;

}
function navScroll(){
    if($(window).scrollTop()>0){
        $(".navbar").addClass("navscroll");
    }
    else{
        $(".navbar").removeClass("navscroll");
    }
}
