﻿using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation
{
    public class CreditCardValidator : AbstractValidator<CreditCard>
    {
        public CreditCardValidator()
        {
            RuleFor(c => c.CustomerId).NotEmpty();
            RuleFor(c => c.NameSurname).NotEmpty();
            RuleFor(c => c.CardNo).NotEmpty();
            RuleFor(c => c.Cvc).NotEmpty();
            RuleFor(c => c.ExpirationDate).NotEmpty();
        }
    }
}


