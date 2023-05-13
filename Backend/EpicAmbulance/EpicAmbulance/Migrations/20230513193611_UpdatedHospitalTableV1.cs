using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EpicAmbulance.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedHospitalTableV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Hospitals",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Hospitals",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MapUrl",
                table: "Hospitals",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "MapUrl",
                table: "Hospitals");
        }
    }
}
