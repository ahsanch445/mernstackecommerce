export const color= [

      "White",
      "Black",
      "Red",
      "Beige",
      "Brown",
      "Blue",
      "Green",
      "Pink",
      "Purple",
      "Yellow"
    ];
    export const  FiltersData = [
      
       {id: "color",
       name: "Color",
      options: [
          { value: "white", label: "White" },
          { value: "beige", label: "Beige" },
          { value: "blue", label: "Blue" },
          { value: "brown", label: "Brown" },
          { value: "green", label: "Green" },
          { value: "purple", label: "Purple" },
          { value: "yellow", label: "Yellow" }
        ]
      },
      
      {
        id:"size",
        name:"Size",
        options:[
{value:"S",label:"S"},
{value:"M",label:"M"},
{value:"L",label:"L"}
        ]
      }
    ]
  export const singalFilterData =[ 

      {
        id: "price",
        name: "Price",
        options: [
          { "value": "1599--3999", "label": "₹1599 To ₹3999" },
          { "value": "3999--7999", "label": "₹3999 To ₹7999" },
          { "value": ">7999", "label": ">₹7999" }
        ]
      },
      {
      id: "discount",
      name: "Discount Range",
      options: [
        { "value": "1%", "label": "1% And Above" },
        { "value": "20%", "label": "20% And Above" },
        { "value": "30%", "label": "30% And Above" },
        { "value": "40%", "label": "40% And Above" },
        { "value": "50%", "label": "50% And Above" },
        { "value": ">60%", "label": ">60% And Above" }
      ]
    },{
        "id": "stock",
        "name": "Availability",
        "options": [
          {
            "value": "in_stock",
            "label": "In Stock"
          },
          {
            "value": "out_of_stock",
            "label": "Out Of Stock"
          }
        ]
      }



    ]
    
      
       
    
  