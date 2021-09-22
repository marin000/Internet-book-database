<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517214939 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE all_time_books DROP FOREIGN KEY FK_7EDDDFCE16A2B381');
        $this->addSql('DROP INDEX UNIQ_7EDDDFCE16A2B381 ON all_time_books');
        $this->addSql('ALTER TABLE all_time_books ADD name VARCHAR(255) NOT NULL, ADD author VARCHAR(60) NOT NULL, ADD image VARCHAR(255) NOT NULL, DROP book_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE all_time_books ADD book_id INT NOT NULL, DROP name, DROP author, DROP image');
        $this->addSql('ALTER TABLE all_time_books ADD CONSTRAINT FK_7EDDDFCE16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7EDDDFCE16A2B381 ON all_time_books (book_id)');
    }
}
