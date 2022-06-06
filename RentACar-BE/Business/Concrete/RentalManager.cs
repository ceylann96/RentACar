﻿using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Core.Aspects.Autofac.Validation;
using Core.Aspects.Autofac.Caching;
using Business.ValidationRules.FluentValidation;
using Core.Utilities.Business;
using Business.BusinessAspects.Autofac;
using Core.Aspects.Autofac.Performance;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {


        IRentalDal _rentalDal;


        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }


        //[SecuredOperation("admin,rental.add")]
        [ValidationAspect(typeof(RentalValidator))]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Add(Rental rental)
        {
            var result = BusinessRules.Run(CarAvailabilityCheck(rental),
                                           FindeksScoreAvailabilityCheck(rental));

            if (result != null)
            {
                return result;
            }

            _rentalDal.Add(rental);

            return new SuccessResult(Messages.Added);
        }


        [SecuredOperation("admin,rental.delete")]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Delete(Rental rental)
        {
            _rentalDal.Delete(rental);

            return new SuccessResult(Messages.Deleted);
        }


        [SecuredOperation("admin,rental.update")]
        [ValidationAspect(typeof(RentalValidator))]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Update(Rental rental)
        {
            _rentalDal.Update(rental);

            return new SuccessResult(Messages.Updated);
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<List<Rental>> GetAll()
        {
            if (DateTime.Now.Hour == 22)
            {
                return new ErrorDataResult<List<Rental>>(Messages.MaintenanceTime);
            }
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.Listed);
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<Rental> GetById(int rentalId)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r => r.RentalId == rentalId));
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<Rental> GetIdByRentalInfos(int carId, int customerId, DateTime rentDate, DateTime returnDate)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r => r.CarId == carId
                                                                && r.CustomerId == customerId
                                                                && r.RentDate == rentDate
                                                                && r.ReturnDate == returnDate));
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<List<RentalDetailDto>> GetRentalDetails()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetRentalDetails(), Messages.Listed);
        }


        // Business Rules Methods
        private IResult CarAvailabilityCheck(Rental rental)
        {
            var overlappingDateList = _rentalDal.GetRentalDetails(r => r.CarId == rental.CarId
                                                                  && r.RentDate < rental.ReturnDate
                                                                  && r.ReturnDate > rental.RentDate);

            if (overlappingDateList.Count() == 0)
            {
                return new SuccessResult();
            }
            else
            {
                return new ErrorResult(Messages.CarIsAlreadyRented);
            }
        }


        private IResult FindeksScoreAvailabilityCheck(Rental rental)
        {
            var result = _rentalDal.GetFindeksScores(rental.CarId, rental.CustomerId);

            if (result.CarMinFindeksScore <= result.CustomerFindeksScore)
            {
                return new SuccessResult();
            }
            else
            {
                return new ErrorResult(Messages.FindeksScoreIsNotEnough);
            }
        }


    }
}
