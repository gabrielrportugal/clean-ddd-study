import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

describe('[EditAnswerUseCase]', () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: EditAnswerUseCase

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'Updated Content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Updated Content',
    })
  })

  it('should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
      content: 'Updated Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
