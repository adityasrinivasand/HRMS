//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRHUB.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Leave_Tracking
    {
        public int ID { get; set; }
        public int Employee_ID { get; set; }
        public int Leave_Type_ID { get; set; }
        public double RemainingDays { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Leave_Type Leave_Type { get; set; }
    }
}
