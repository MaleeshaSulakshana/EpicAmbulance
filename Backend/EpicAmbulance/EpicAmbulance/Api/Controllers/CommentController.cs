using EpicAmbulance.Database;
using EpicAmbulance.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EpicAmbulance.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repository;
        // private readonly IBookingRepository _bookingRepository;

        // public CommentController(ICommentRepository commentRepository, IBookingRepository _bookingRepository)
        public CommentController(ICommentRepository commentRepository)
        {
            _repository = commentRepository;
            // _bookingRepository = _bookingRepository;
        }

        [HttpGet]
        [Route("booking/{id}")]
        public IEnumerable<CommentModel> GetAllByBookingId(Guid id)
        {
            var result = new List<CommentModel>();
            var comments = _repository.GetAllByBooking(id).AsEnumerable();

            foreach (var comment in comments)
            {
                result.Add(new CommentModel(comment));
            }
            return result;
        }

        [HttpPost]
        public ActionResult<CommentModel> Create(CommentModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // var existUser = _repository.GetByEmail(model.Email);
            // if (existUser != null)
            // {
            //     return BadRequest("Invalid booking id");
            // }

            var comment = new Comment()
            {
                CommentDetails = model.CommentDetails!,
                UserId = model.UserId!,
                User = model.User!,
                BookingId = model.BookingId!,
                Booking = model.Booking!,
            };

            _repository.Create(comment);
            return Ok();
        }

    }
}