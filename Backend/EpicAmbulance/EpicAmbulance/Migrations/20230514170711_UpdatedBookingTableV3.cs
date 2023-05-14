using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EpicAmbulance.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBookingTableV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "StatusType",
                table: "Bookings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusType",
                table: "Bookings");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Bookings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
