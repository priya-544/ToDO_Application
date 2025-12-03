using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo_Application.Data;
using ToDo_Application.Models;
using ToDo_Application.Models.Entities;

namespace ToDo_Application.Controllers
{
    //localhost:xxxx/api/todo
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ToDoController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

     

        //[HttpGet]
        //public IActionResult GetToDoList()
        //{
        //    var allToDo = dbContext.ToDo.ToList();

        //    return Ok(allToDo);

        //}
        [HttpGet]
        public IActionResult GetToDoList()
        {
            try
            {
                var allToDo = dbContext.ToDo.ToList();
                return Ok(allToDo);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new
                {
                    Message = "An error occurred while fetching the ToDo list.",
                    Details = ex.Message
                });
            }
        }


        [HttpPost]
        public IActionResult AddToDo(AddToDoDto addToDoDto)
        {
            try
            {
                if (addToDoDto == null)
                {
                    return BadRequest("Invalid request! Body cannot be empty.");
                }

                var toDoEntity = new ToDo()
                {
                    Title = addToDoDto.Title,
                    Priority = addToDoDto.Priority,
                    Category = addToDoDto.Category,
                    Status = addToDoDto.Status,
                    CreatedAt = addToDoDto.CreatedAt,
                    DueDate = addToDoDto.DueDate
                };

                dbContext.ToDo.Add(toDoEntity);
                dbContext.SaveChanges();

                return Ok(toDoEntity);
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, "Database error occurred: " + dbEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetToDoById(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Invalid ID. ID must be greater than zero.");
                }

                var todo = dbContext.ToDo.Find(id);

                if (todo is null)
                {
                    return NotFound("ToDo not found.");
                }

                return Ok(todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the data: " + ex.Message);
            }
        }


        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateToDO(int id, UpdateToDoDto updateToDoDto)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Invalid ID. ID must be greater than zero.");
                }

                var todo = dbContext.ToDo.Find(id);

                if (todo is null)
                {
                    return NotFound("ToDo not found.");
                }

                todo.Title = updateToDoDto.Title;
                todo.Priority = updateToDoDto.Priority;
                todo.Category = updateToDoDto.Category;
                todo.Status = updateToDoDto.Status;
                todo.DueDate = updateToDoDto.DueDate;

                dbContext.SaveChanges();

                return Ok(todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the record: " + ex.Message);
            }
        }



        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteToDo(int id)
        {
            try
            {
                var todo = dbContext.ToDo.Find(id);

                if (todo is null)
                {
                    return NotFound(new { message = $"ToDo with ID {id} not found." });
                }

                dbContext.ToDo.Remove(todo);
                dbContext.SaveChanges();

                return Ok(new { message = "ToDo deleted successfully." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Database update failed.", error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", error = ex.Message });
            }
        }


        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTodo(int id)
        //{
        //    var todo = await _context.Todos.FindAsync(id);
        //    if (todo == null) return NotFound();

        //    _context.Todos.Remove(todo);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

    }
}
