using System;
using System.Collections.Generic;

namespace PropertyAPI.Dtos;

public class PropertyDto
{
    public string IdProperty { get; set; }

    public string Name { get; set; }
    public string Address { get; set; }
    public decimal Price { get; set; }
    public string CodeInternal { get; set; }
    public decimal Year { get; set; }
    public string IdOwner { get; set; }

    public decimal Bedrooms { get; set; }
    public decimal Bathrooms { get; set; }
    public decimal Area { get; set; }
    public OwnerDto Owner { get; set; }
    public List<PropertyImageDto> Images{ get; set;}
    public List<PropertyTraceDto> Traces{ get; set;}


}