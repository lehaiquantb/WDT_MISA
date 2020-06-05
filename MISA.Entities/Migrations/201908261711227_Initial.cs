namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
               "dbo.Customers",
               c => new
               {
                   CustomerID = c.Guid(nullable: false, defaultValueSql: "newid()", identity: true),
                   CustomerNo = c.String(),
                   CustomerName = c.String(),
                   CompanyName = c.String(),
                   TaxCode = c.String(),
                   Address = c.String(),
                   CustomerPhone = c.String(),
                   Email = c.String(),
                   MemberCardCode = c.String(),
                   CardClass = c.String(),
                   Note = c.String(),
                   MoneyInDebt = c.Decimal(nullable: false, precision: 18, scale: 2, defaultValue: 0),
                   CustomerGroup = c.String(),
                   Birthday = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                   FiveFoodMember = c.Boolean(nullable: false, defaultValue: true),
                   StopWatching = c.Boolean(nullable: false, defaultValue: false),
               })
               .PrimaryKey(t => t.CustomerID);
        }

        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}