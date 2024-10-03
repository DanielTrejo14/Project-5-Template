"""message

Revision ID: 3250395397a0
Revises: 383fcbadb25e
Create Date: 2024-10-03 00:43:46.352171

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

# revision identifiers, used by Alembic.
revision = '3250395397a0'
down_revision = '383fcbadb25e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.alter_column('ingredients',
               existing_type=sqlite.JSON(),
               type_=sa.Text(),
               existing_nullable=True)
        batch_op.alter_column('categories',
               existing_type=sqlite.JSON(),
               type_=sa.Integer(),
               existing_nullable=True)
        batch_op.create_foreign_key(batch_op.f('fk_recipe_categories_category'), 'category', ['categories'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_recipe_categories_category'), type_='foreignkey')
        batch_op.alter_column('categories',
               existing_type=sa.Integer(),
               type_=sqlite.JSON(),
               existing_nullable=True)
        batch_op.alter_column('ingredients',
               existing_type=sa.Text(),
               type_=sqlite.JSON(),
               existing_nullable=True)

    # ### end Alembic commands ###
