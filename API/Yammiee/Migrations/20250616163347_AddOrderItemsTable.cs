using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yammiee.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderItemsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderItem_Orders_OrderId",
                table: "tblOrderItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblOrderItem",
                table: "tblOrderItem");

            migrationBuilder.RenameTable(
                name: "tblOrderItem",
                newName: "OrderItems");

            migrationBuilder.RenameIndex(
                name: "IX_tblOrderItem_OrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderId",
                table: "OrderItems",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderId",
                table: "OrderItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems");

            migrationBuilder.RenameTable(
                name: "OrderItems",
                newName: "tblOrderItem");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_OrderId",
                table: "tblOrderItem",
                newName: "IX_tblOrderItem_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblOrderItem",
                table: "tblOrderItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderItem_Orders_OrderId",
                table: "tblOrderItem",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
