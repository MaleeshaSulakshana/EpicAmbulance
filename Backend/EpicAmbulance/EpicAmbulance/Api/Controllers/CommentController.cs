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
        private readonly IBookingRepository _bookingRepository;
        private readonly IUserRepository _userRepository;

        public CommentController(
            ICommentRepository commentRepository,
            IBookingRepository bookingRepository,
            IUserRepository userRepository
            )
        {
            _repository = commentRepository;
            _bookingRepository = bookingRepository;
            _userRepository = userRepository;
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

            var user = _userRepository.Get(model.UserId);
            if (user == null)
            {
                return BadRequest("Invalid user.");
            }
            var booking = _bookingRepository.Get(model.BookingId);

            if (booking == null)
            {
                return BadRequest("Invalid booking.");
            }

            var comment = new Comment()
            {
                CommentDetails = model.CommentDetails!,
                UserId = model.UserId!,
                BookingId = model.BookingId!
            };

            _repository.Create(comment);
            return Ok();
        }

    }
}